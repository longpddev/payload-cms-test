'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MapTabs = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="hanoi" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hanoi">Hà Nội</TabsTrigger>
          <TabsTrigger value="hochiminh">Hồ Chí Minh</TabsTrigger>
        </TabsList>

        <TabsContent value="hanoi" className="mt-2">
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465.7461177252135!2d105.76536278951129!3d20.95376236630682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345358d6b83b6f%3A0x9d99ccfa9c0212dc!2zOTAgVFQxLCBQaMO6IEzGsMahbmcsIEjDoCDEkMO0bmcsIEjDoCBO4buZaSAxMjEyMiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1755270432275!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ chi nhánh Hà Nội"
            />
          </div>
        </TabsContent>

        <TabsContent value="hochiminh" className="mt-6">
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0623914183107!2d106.64717597573681!3d10.882859257220115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d61ee200d881%3A0x22cb06b0acdb221c!2zMjcgxJDGsOG7nW5nIFRo4bubaSBBbiAxMiwgVGjhu5tpIEFuLCBRdeG6rW4gMTIsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1755270385974!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ chi nhánh Hồ Chí Minh"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { MapTabs }
