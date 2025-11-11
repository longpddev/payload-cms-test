// storage-adapter-import-placeholder
// import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path, { join } from 'path'
import { buildConfig, PayloadRequest, SharpDependency } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Projects } from './collections/Projects'
import { Pages } from './collections/Pages'
import { PriceQuotes } from './collections/PriceQuotes'
import { HomePage } from './global-configs/HomePage'
import { Header } from './global-configs/Header'
import { Footer } from './global-configs/Footer'
import { vi } from '@payloadcms/translations/languages/vi'
import { en } from '@payloadcms/translations/languages/en'
import { DEFAULT_SEO } from './lib/seo'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudflareRemoteBindings = process.env.NODE_ENV === 'production'
const cloudflare =
  process.argv.find((value) => value.match(/^(generate|migrate):?/)) || !cloudflareRemoteBindings
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

const databaseDriver = process.env.PAYLOAD_DATABASE_DRIVER || 'vercel-postgres'
const storageDriver = process.env.PAYLOAD_STORAGE_DRIVER || 's3'

const useLocalUploads = storageDriver === 'local' || process.env.LOCAL_BLOB === 'true'

export default buildConfig({
  upload: {
    limits: {},
  },
  localization: {
    locales: ['en', 'vi'], // Vietnamese enabled
    defaultLocale: 'vi',
    fallback: true, // fallback to English when missing
  },
  i18n: {
    supportedLanguages: { vi, en }, // include other languages if needed
    fallbackLanguage: 'en',
  },
  admin: {
    theme: 'light',
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: './components/payload/Logo',
        Icon: './components/payload/Icon',
      },
    },
  },
  collections: [Users, Media, Categories, Products, Projects, Pages, PriceQuotes],
  globals: [HomePage, Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'c97abbd01ecf8fecec9aa4b1',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  jobs: {
    jobsCollectionOverrides: ({ defaultJobsCollection }) => {
      if (!defaultJobsCollection.admin) {
        defaultJobsCollection.admin = {}
      }

      defaultJobsCollection.admin.hidden = false
      return defaultJobsCollection
    },
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
  },
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: 'no-reply@cdlight.vn',
    defaultFromName: 'CD LIGHT',
  }),
  plugins: [
    payloadCloudPlugin(),
    nestedDocsPlugin({
      collections: ['categories'],
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seoPlugin({
      generateTitle: ({ doc }) => `CD LIGHT — ${doc?.name || doc?.title}`,
      generateDescription: ({ doc }) =>
        doc?.shortDescription ||
        doc?.excerpt ||
        'Sản phẩm chiếu sáng chất lượng cao từ CD LIGHT - Uy tín tạo nên thương hiệu',
      generateURL: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'pages') {
          return join(DEFAULT_SEO.domain || '', doc?.slug)
        }
        return join(DEFAULT_SEO.domain || '', collectionSlug || '', doc?.slug || '')
      },
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
      },
    }),
    importExportPlugin({
      collections: ['users', 'media', 'categories', 'products', 'projects'],
    }),
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    // storage-adapter-placeholder
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        experimental: { remoteBindings: cloudflareRemoteBindings },
      } satisfies GetPlatformProxyOptions),
  )
}
