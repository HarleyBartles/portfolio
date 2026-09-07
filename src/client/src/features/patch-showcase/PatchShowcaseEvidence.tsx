import { getPatchAssetPath, getPatchMediaByPath } from '../case-study/patch/patchEvidence'
import { CaseStudyMediaCaption } from '../case-study/CaseStudyMediaCaption'
import styled from 'styled-components'

const IdentityEvidence = styled.figure`
  overflow: hidden;
  border-block: 1px solid var(--color-border);
  .identity-evidence__logic { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); color: var(--color-surface); background: var(--color-ink); }
  .identity-evidence__logic > div { display: grid; align-content: start; gap: var(--space-2); padding: var(--space-5); border-left: 1px solid rgb(255 250 240 / 22%); }
  .identity-evidence__logic > div:first-child { border-left: 0; }
  .identity-evidence__logic > div:last-child { color: var(--color-ink); background: #c9ded5; }
  .identity-evidence__logic span:first-child, .identity-evidence__logic small, .identity-evidence__outcome { font-family: var(--font-site-sans); font-size: var(--type-metadata-size); }
  .identity-evidence__logic strong { font-family: var(--font-site-sans); font-size: clamp(1.2rem, 2vw, 1.65rem); line-height: 1.1; }
  .identity-evidence__outcome { width: fit-content; margin-top: var(--space-2); padding-top: var(--space-2); border-top: 1px solid currentColor; font-weight: 700; }
  .identity-evidence__source-pair { display: grid; grid-template-columns: .74fr 1.26fr; gap: 1px; background: rgb(73 50 20 / 25%); }
  .identity-evidence__source-pair > div { display: grid; grid-template-rows: 1fr auto; min-width: 0; background: var(--color-surface); }
  .identity-evidence__source-pair picture { position: relative; display: block; box-sizing: border-box; height: clamp(14rem, 24vw, 20rem); overflow: hidden; background: #fff; }
  .identity-evidence__source-pair img { position: absolute; inset: var(--space-4); width: calc(100% - (2 * var(--space-4))); height: calc(100% - (2 * var(--space-4))); object-fit: contain; }
  .identity-evidence__source-pair > div:first-child img { inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .identity-evidence__failure-pair { display: grid; grid-template-columns: 1.5fr 1fr; height: 100%; }
  .identity-evidence__failure-pair > div { display: grid; min-width: 0; background: #fff; }
  .identity-evidence__failure-pair picture { height: 100%; }
  .identity-evidence__failure-pair img { object-position: center bottom; }
  .identity-evidence__failure-pair > div:last-child img { inset: auto auto var(--space-4) 50%; width: 90%; height: 80%; transform: translateX(-50%); }
  .identity-evidence__source-pair p { margin: 0; padding: var(--space-3) var(--space-4); border-top: 1px solid var(--color-border); font-family: var(--font-site-sans); font-size: var(--type-caption-size); }
  .identity-evidence__roles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; margin: 1px 0 0; padding: 0; background: rgb(73 50 20 / 25%); list-style: none; }
  .identity-evidence__roles li { display: grid; grid-template-rows: auto auto; min-width: 0; background: var(--color-surface); }
  .identity-evidence__roles picture { position: relative; display: block; aspect-ratio: 4 / 5; overflow: hidden; background: #fff; }
  .identity-evidence__roles img { position: absolute; inset: var(--space-3); width: calc(100% - (2 * var(--space-3))); height: calc(100% - (2 * var(--space-3))); object-fit: contain; }
  .identity-evidence__roles span { padding: var(--space-3); border-top: 1px solid var(--color-border); font-family: var(--font-site-sans); font-size: var(--type-caption-size); font-weight: 700; text-align: center; }
  @media (max-width: 44rem) {
    .identity-evidence__logic, .identity-evidence__source-pair { grid-template-columns: 1fr; }
    .identity-evidence__source-pair > div:first-child picture { height: auto; aspect-ratio: 5 / 4; }
    .identity-evidence__failure-pair { grid-template-columns: minmax(0,2fr) minmax(0,1fr); height: clamp(10rem,44vw,12rem); }
    .identity-evidence__failure-pair > div:last-child img { width: 100%; height: 90%; }
    .identity-evidence__logic > div { border-top: 1px solid rgb(255 250 240 / 22%); border-left: 0; }
    .identity-evidence__logic > div:first-child { border-top: 0; }
    .identity-evidence__roles { grid-template-columns: repeat(2, minmax(0,1fr)); }
  }
`

export function PatchShowcasePicture({ path, alt }: { path: string; alt: string }) {
  const avif = getPatchMediaByPath(path)
  const webp = getPatchMediaByPath(path.replace(/\.avif$/, '.webp'))
  if (avif === undefined || webp === undefined) throw new Error(`Patch evidence is missing for ${path}.`)

  return (
    <picture>
      <source srcSet={getPatchAssetPath(avif.path)} type="image/avif" />
      <source srcSet={getPatchAssetPath(webp.path)} type="image/webp" />
      <img src={getPatchAssetPath(webp.path)} width={webp.width} height={webp.height} alt={alt} loading="lazy" decoding="async" />
    </picture>
  )
}

const identityRoles = [
  { name: 'Cowboy', path: 'src/client/public/media/patch/patch-identity-cowboy-480.avif', alt: 'Patch wearing the cowboy role kit with hat, waistcoat, boots and lasso.' },
  { name: 'Detective', path: 'src/client/public/media/patch/patch-identity-detective-480.avif', alt: 'Patch wearing the detective role kit with deerstalker, coat and magnifying glass.' },
  { name: 'Mechanic', path: 'src/client/public/media/patch/patch-identity-mechanic-480.avif', alt: 'Patch wearing the mechanic role kit and holding a wrench.' },
  { name: 'Chef', path: 'src/client/public/media/patch/patch-identity-chef-480.avif', alt: 'Patch wearing the chef role kit with apron and chef hat.' },
] as const

export function IdentityEmporiumEvidence() {
  return (
    <IdentityEvidence className="identity-evidence" aria-label="Identity Emporium compares three approaches to preparation">
      <div className="identity-evidence__logic" aria-label="Three approaches to a cowboy task">
        <div><span>Bot</span><strong>Preparation mistaken for a script</strong><small>All the gear, no idea</small><span className="identity-evidence__outcome">Misreads the work</span></div>
        <div><span>Bit</span><strong>Straight to work, underprepared</strong><small>No get-up, can&apos;t get down to work</small><span className="identity-evidence__outcome">Starts too soon</span></div>
        <div><span>Patch</span><strong>Preparation shaped by the task</strong><small>Prepared for the job</small><span className="identity-evidence__outcome">Ready to work</span></div>
      </div>
      <div className="identity-evidence__source-pair">
        <div>
          <PatchShowcasePicture path="src/client/public/media/patch/patch-identity-1200.avif" alt="Patch receives a mission role kit from the Identity Emporium shopkeeper." />
          <p>The Emporium supplies the role</p>
        </div>
        <div className="identity-evidence__failure-panel">
          <div className="identity-evidence__failure-pair">
            <div>
              <PatchShowcasePicture path="src/client/public/media/patch/patch-identity-bot-failure-480.avif" alt="Bot in a cowboy role kit trying to lasso a fleeing chicken." />
            </div>
            <div>
              <PatchShowcasePicture path="src/client/public/media/patch/patch-identity-bit-action-480.avif" alt="Bit carrying a toolbox in his usual robot configuration." />
            </div>
          </div>
          <p>Bit and Bot expose the two failure modes</p>
        </div>
      </div>
      <ul className="identity-evidence__roles" aria-label="Patch role kits">
        {identityRoles.map((role) => <li key={role.name}><PatchShowcasePicture path={role.path} alt={role.alt} /><span>{role.name}</span></li>)}
      </ul>
      <CaseStudyMediaCaption>Preparation gives capability a useful shape. Judgement keeps it relevant once the work begins.</CaseStudyMediaCaption>
    </IdentityEvidence>
  )
}
