import {Link} from '@remix-run/react'

export default function () {
  return (
    <div className="flex flex-col items-center justify-center gap-6 pt-6">
      <h1 className="text-4xl">Welcome to Gladia!</h1>
      <h2>What do you want to do?</h2>
      <Link to="/transcription/audio" className="btn btn-primary btn-xl">
        Audio Transcription
      </Link>
      <Link to="/transcription/video" className="btn btn-primary btn-xl">
        Video Transcription
      </Link>
    </div>
  )
}
