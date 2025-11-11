import React from 'react'
import Slider from '@/components/Slider'
import SliderItem from '@/components/SliderItem'
import ContentWithImage from '@/components/ContentWithImage'
import type { TypicalProjectsBlock as TypicalProjectsBlockType } from '@/payload-types'

export const TypicalProjectsBlockComponent: React.FC<TypicalProjectsBlockType> = ({
  selectedProjects,
}) => {
  if (!selectedProjects?.length) return null

  return (
    <Slider animation="fade">
      {selectedProjects.map((project, index) => {
        // Handle relationship data - project could be string (ID) or full object
        if (typeof project === 'string') return null
        if (typeof project === 'number') return null

        return (
          <SliderItem key={project.id || index}>
            <ContentWithImage
              title={project.name}
              description={project.shortDescription || ''}
              imageUrl={
                typeof project.previewImage === 'object' ? project.previewImage?.url || '' : ''
              }
              link={`/projects/${project.slug}`}
            />
          </SliderItem>
        )
      })}
    </Slider>
  )
}
