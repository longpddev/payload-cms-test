import {
  TextFade,
  GradualSpacing,
  TypingEffect,
  StaggeredFade,
  RotateWords,
  LettersPullUp,
  WordsPullUp,
  BlurIn,
  FadeUp,
  FadeDown,
} from '@/components/animations'

export default function TextAnimationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Text Animation Components</h1>
          <p className="text-lg text-gray-600">
            A collection of text animations inspired by Indie UI
          </p>
        </div>

        {/* Gradual Spacing */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Gradual Spacing</h2>
          <div className="text-3xl font-bold text-blue-600">
            <GradualSpacing text="Gradual Spacing" />
          </div>
        </section>

        {/* Typing Effect */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Typing Effect</h2>
          <div className="text-3xl font-bold text-green-600">
            <TypingEffect text="Typing Effect" />
          </div>
        </section>

        {/* Staggered Fade */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Staggered Fade</h2>
          <div className="text-3xl font-bold text-purple-600">
            <StaggeredFade text="Staggered Fade Animation" />
          </div>
        </section>

        {/* Rotate Words */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Rotate Words</h2>
          <div className="text-3xl font-bold text-orange-600">
            You can{' '}
            <RotateWords
              words={['build', 'create', 'design', 'develop']}
              className="text-red-600"
            />
          </div>
        </section>

        {/* Letters Pull Up */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Letters Pull Up</h2>
          <div className="text-3xl font-bold text-indigo-600">
            <LettersPullUp text="Letters Pull Up" />
          </div>
        </section>

        {/* Words Pull Up */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Words Pull Up</h2>
          <div className="text-3xl font-bold text-pink-600">
            <WordsPullUp text="Words Pull Up" />
          </div>
        </section>

        {/* Blur In */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Blur In</h2>
          <div className="text-3xl font-bold text-teal-600">
            <BlurIn text="Blur In" />
          </div>
        </section>

        {/* Fade Up */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Fade Up</h2>
          <FadeUp>
            <div className="text-3xl font-bold text-cyan-600">Fade Up</div>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit amet.
            </p>
          </FadeUp>
        </section>

        {/* Fade Down */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Fade Down</h2>
          <FadeDown>
            <div className="text-3xl font-bold text-amber-600">Fade Down</div>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit amet.
            </p>
          </FadeDown>
        </section>

        {/* Text Fade (existing component) */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Text Fade (Up)</h2>
          <TextFade direction="up" className="text-3xl font-bold text-emerald-600">
            <div>Text Fade Up</div>
            <div>With Multiple</div>
            <div>Elements</div>
          </TextFade>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Text Fade (Down)</h2>
          <TextFade direction="down" className="text-3xl font-bold text-rose-600">
            <div>Text Fade Down</div>
            <div>With Multiple</div>
            <div>Elements</div>
          </TextFade>
        </section>
      </div>
    </div>
  )
}
