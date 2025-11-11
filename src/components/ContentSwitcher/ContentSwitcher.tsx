import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode } from 'react'

export interface TabItem {
  default?: boolean
  title: string
  content: ReactNode
}

export const ContentSwitcher = ({ items }: { items: TabItem[] }) => {
  const defaultItem = items.find((item) => item.default) ?? items.at(0)

  if (!defaultItem) {
    return null
  }

  return (
    <Tabs defaultValue={defaultItem.title} className="gap-0">
      <TabsList className="justify-start bg-transparent rounded-none p-0 relative z-1 -mb-[2px]">
        {items.map((item) => (
          <TabsTrigger
            key={item.title}
            className="w-fit grow-0 basis-0 rounded-none shadow-none! outline-none px-4 data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-gray-200"
            value={item.title}
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent
          key={item.title}
          value={item.title}
          className="bg-white p-6 border border-gray-200"
        >
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
