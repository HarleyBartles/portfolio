import { getPatchAssetPath, getPatchMediaByPath } from '../case-study/patch/patchEvidence'
import { CaseStudyMediaCaption } from '../case-study/CaseStudyMediaCaption'

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
    <figure className="identity-evidence" aria-label="Identity Emporium compares three approaches to preparation">
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
    </figure>
  )
}
