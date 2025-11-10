export function notFound(req, res, next) {
  res.status(404).json({ message: 'Not Found' })
}

export function errorHandler(err, req, res, next) {
  const code = err.status || 500
  res.status(code).json({ message: err.message || 'Server Error', code })
}
