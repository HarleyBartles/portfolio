import styled from 'styled-components'

type LearningLabImageId = 'engineering-control-workbench' | 'safe-breakage-rig' | 'authority-transfer'

type LearningLabImageProps = {
  id: LearningLabImageId
  className?: string
  eager?: boolean
}

const Image = styled.picture`
  display: block;
  width: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 44rem) {
    &[data-learning-lab-image-id='safe-breakage-rig'] img,
    &[data-learning-lab-image-id='authority-transfer'] img { height: auto; }
  }
`

const images = {
  'engineering-control-workbench': {
    desktop: 'engineering-control-workbench-desktop-1440',
    mobile: 'engineering-control-workbench-mobile-720',
    width: 720,
    height: 450,
    alt: 'Hands inspect measured components and test evidence at a controlled engineering workbench, with recovery tools already in place.',
  },
  'safe-breakage-rig': {
    desktop: 'safe-breakage-rig-desktop-1200',
    mobile: 'safe-breakage-rig-mobile-720',
    width: 720,
    height: 540,
    alt: 'A fractured test piece remains inside a clear containment rig beside a protected reference specimen and ready reset carriage.',
  },
  'authority-transfer': {
    desktop: 'authority-transfer-desktop-1440',
    mobile: 'authority-transfer-mobile-720',
    width: 720,
    height: 461,
    alt: 'Three connected work zones move from engineer-led inspection through shared prose review to learner-led technical drawing judgment.',
  },
} as const

function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function LearningLabImage({ id, className, eager = false }: LearningLabImageProps) {
  const image = images[id]
  const pictureClassName = ['learning-lab-image', `learning-lab-image--${id}`, className].filter(Boolean).join(' ')

  return (
    <Image className={pictureClassName} data-learning-lab-image-id={id}>
      <source media="(min-width: 45rem)" srcSet={assetPath(`/media/learning-lab/${image.desktop}.avif`)} type="image/avif" />
      <source media="(min-width: 45rem)" srcSet={assetPath(`/media/learning-lab/${image.desktop}.webp`)} type="image/webp" />
      <source srcSet={assetPath(`/media/learning-lab/${image.mobile}.avif`)} type="image/avif" />
      <source srcSet={assetPath(`/media/learning-lab/${image.mobile}.webp`)} type="image/webp" />
      <img
        src={assetPath(`/media/learning-lab/${image.mobile}.webp`)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </Image>
  )
}
