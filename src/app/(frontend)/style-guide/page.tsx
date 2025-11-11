import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Home,
  User,
  Settings,
  Bell,
  Search,
  Heart,
  Star,
  Download,
  Plus,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
} from 'lucide-react'

export default function StyleGuide() {
  const colors = [
    { name: 'Primary', class: 'bg-primary', hex: '#2563eb' },
    { name: 'Secondary', class: 'bg-secondary', hex: '#4b5563' },
    { name: 'Success', class: 'bg-green-600', hex: '#16a34a' },
    { name: 'Warning', class: 'bg-yellow-500', hex: '#eab308' },
    { name: 'Error', class: 'bg-red-600', hex: '#dc2626' },
    { name: 'Background', class: 'bg-gray-50', hex: '#f9fafb' },
    { name: 'Surface', class: 'bg-white', hex: '#ffffff' },
    { name: 'Text Primary', class: 'bg-gray-900', hex: '#111827' },
  ]

  const icons = [
    { icon: Home, name: 'Home' },
    { icon: User, name: 'User' },
    { icon: Settings, name: 'Settings' },
    { icon: Bell, name: 'Bell' },
    { icon: Search, name: 'Search' },
    { icon: Heart, name: 'Heart' },
    { icon: Star, name: 'Star' },
    { icon: Download, name: 'Download' },
    { icon: Plus, name: 'Plus' },
    { icon: Check, name: 'Check' },
    { icon: X, name: 'X' },
    { icon: AlertCircle, name: 'Alert' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4">Design System Style Guide</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive collection of design tokens, components, and patterns that ensure
            consistency across our digital products.
          </p>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Primary colors and their usage guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {colors.map((color) => (
                    <div key={color.name} className="text-center">
                      <div
                        className={`${color.class} h-24 w-full rounded-lg mb-3 border shadow-sm`}
                      ></div>
                      <h3 className="font-semibold text-sm text-gray-900">{color.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">{color.hex}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="mb-4">Color Usage</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Primary Colors</h4>
                      <p className="text-sm text-blue-700">
                        Used for main actions, links, and brand elements
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Neutral Colors</h4>
                      <p className="text-sm text-gray-700">
                        Used for text, backgrounds, and subtle UI elements
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography">
            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
                <CardDescription>Consistent text styles and hierarchy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h1 className="mb-2">Heading 1 - CD Light Main Title</h1>
                  <p className="text-sm text-gray-500 font-mono">
                    Semantic &lt;h1&gt; tag - Quicksand Bold, Responsive
                  </p>
                  <p className="text-xs text-gray-400">
                    30px → 36px → 48px (mobile → tablet → desktop)
                  </p>
                </div>

                <div>
                  <h2 className="mb-2">Heading 2 - Section Titles</h2>
                  <p className="text-sm text-gray-500 font-mono">
                    Semantic &lt;h2&gt; tag - Quicksand Bold, Responsive
                  </p>
                  <p className="text-xs text-gray-400">
                    24px → 30px → 36px (mobile → tablet → desktop)
                  </p>
                </div>

                <div>
                  <h3 className="mb-2">Heading 3 - Subsection Titles</h3>
                  <p className="text-sm text-gray-500 font-mono">
                    Semantic &lt;h3&gt; tag - Montserrat Semibold, Responsive
                  </p>
                  <p className="text-xs text-gray-400">
                    20px → 24px → 30px (mobile → tablet → desktop)
                  </p>
                </div>

                <div>
                  <h4 className="mb-2">Heading 4 - Content Group Titles</h4>
                  <p className="text-sm text-gray-500 font-mono">
                    Semantic &lt;h4&gt; tag - Montserrat Semibold, Responsive
                  </p>
                  <p className="text-xs text-gray-400">
                    18px → 20px → 24px (mobile → tablet → desktop)
                  </p>
                </div>

                <div>
                  <h5 className="mb-2">Heading 5 - Small Group Titles</h5>
                  <p className="text-sm text-gray-500 font-mono">
                    Semantic &lt;h5&gt; tag - Montserrat Medium, Responsive
                  </p>
                  <p className="text-xs text-gray-400">
                    16px → 18px → 20px (mobile → tablet → desktop)
                  </p>
                </div>

                <div>
                  <h6 className="mb-2">Heading 6 - Label Headings</h6>
                  <p className="text-sm text-gray-500 font-mono">
                    Semantic &lt;h6&gt; tag - Montserrat Medium, Responsive
                  </p>
                  <p className="text-xs text-gray-400">
                    14px → 16px → 18px (mobile → tablet → desktop)
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-base text-gray-900 mb-2">
                    Body text - Đây là văn bản nội dung chính cho website CD Light. Sử dụng font
                    Montserrat với kích thước chuẩn cho khả năng đọc tốt nhất.
                  </p>
                  <p className="text-sm text-gray-500 font-mono">
                    text-base - Montserrat Regular (16px)
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Small text - Dùng cho chú thích và thông tin phụ
                  </p>
                  <p className="text-sm text-gray-500 font-mono">text-sm text-gray-600 (14px)</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    Extra small text - Dùng cho thông tin metadata và chi tiết nhỏ
                  </p>
                  <p className="text-sm text-gray-500 font-mono">text-xs text-gray-500 (12px)</p>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="mb-2">Usage Guidelines</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use semantic HTML tags (h1, h2, h3, etc.) without additional classes</li>
                    <li>• H1-H2 use Quicksand font for impact and brand consistency</li>
                    <li>• H3-H6 use Montserrat for better readability in content</li>
                    <li>• All headings are responsive and support dark mode automatically</li>
                    <li>• Maintain proper heading hierarchy for accessibility</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Buttons Tab */}
          <TabsContent value="buttons">
            <Card>
              <CardHeader>
                <CardTitle>Button Components</CardTitle>
                <CardDescription>Various button styles and states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="mb-4">Button Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4">Button Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4">Button States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      With Icon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Input fields and form components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Type your message here..." />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="disabled">Disabled Input</Label>
                      <Input id="disabled" disabled placeholder="Disabled input" />
                    </div>

                    <div>
                      <Label htmlFor="error">Input with Error</Label>
                      <Input id="error" className="border-red-500" placeholder="Error state" />
                      <p className="text-sm text-red-500 mt-1">This field has an error</p>
                    </div>

                    <div>
                      <Label htmlFor="success">Input with Success</Label>
                      <Input
                        id="success"
                        className="border-green-500"
                        placeholder="Success state"
                      />
                      <p className="text-sm text-green-600 mt-1">This field is valid</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status indicators and labels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>Messages and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This is an informational alert with some important information.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      This is a success alert indicating a completed action.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      This is an error alert indicating something went wrong.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cards</CardTitle>
                  <CardDescription>Container components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Example Card</CardTitle>
                        <CardDescription>This is a sample card component</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          Card content goes here. This is just an example of how cards look.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-dashed border-gray-300">
                      <CardHeader>
                        <CardTitle>Dashed Border Card</CardTitle>
                        <CardDescription>A variation with dashed borders</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          This card has a dashed border style for different use cases.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons">
            <Card>
              <CardHeader>
                <CardTitle>Icon Library</CardTitle>
                <CardDescription>Commonly used icons from Lucide React</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                  {icons.map(({ icon: Icon, name }) => (
                    <div key={name} className="text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="h-8 w-8 text-gray-700" />
                      </div>
                      <p className="text-xs text-gray-500">{name}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="mb-4">Icon Sizes</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <Home className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">16px</p>
                    </div>
                    <div className="text-center">
                      <Home className="h-6 w-6 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">24px</p>
                    </div>
                    <div className="text-center">
                      <Home className="h-8 w-8 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">32px</p>
                    </div>
                    <div className="text-center">
                      <Home className="h-12 w-12 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">48px</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2">Design System Guidelines</h3>
              <p className="text-gray-600 mb-4">
                This style guide serves as the foundation for consistent user experiences across all
                our products.
              </p>
              <div className="flex justify-center gap-4">
                <Badge variant="outline">Version 1.0</Badge>
                <Badge variant="outline">Last Updated: July 2025</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
