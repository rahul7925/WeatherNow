function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__ring" aria-hidden="true" />
      <span>Fetching weather…</span>
    </div>
  )
}

export default Loader
