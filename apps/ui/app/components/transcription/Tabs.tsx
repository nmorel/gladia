import {Link} from '@remix-run/react'
import {cx} from '~/helpers/classnames'

export function Tabs({kind}: {kind: 'audio' | 'video'}) {
  return (
    <div className="tabs justify-center mb-4">
      <Link
        to="/transcription/audio"
        className={cx('tab tab-bordered', {'tab-active': kind === 'audio'})}
      >
        Audio to text
      </Link>
      <Link
        to="/transcription/video"
        className={cx('tab tab-bordered', {'tab-active': kind === 'video'})}
      >
        Video to text
      </Link>
    </div>
  )
}
