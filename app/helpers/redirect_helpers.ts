// Detect unsafe redirects (https://brightsec.com/blog/open-redirect-vulnerabilities/)
export function isSafeRedirect(redirectLocation: string | undefined | null, host: string | null ) {
  if (!redirectLocation || redirectLocation.indexOf("http") !== 0) return true

  const urlObject = new URL(redirectLocation)
  return urlObject.host === host
}
