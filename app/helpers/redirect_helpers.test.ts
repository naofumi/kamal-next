import {isSafeRedirect} from "@/app/helpers/redirect_helpers"

describe("isSafeRedirect", () => {
  const host = "myhost.com"

  it ("undefined", () => {
    expect(isSafeRedirect(undefined, host)).toBe(true);
  })

  it ("null", () => {
    expect(isSafeRedirect(null, host)).toBe(true);
  })

  it ("''", () => {
    expect(isSafeRedirect("", host)).toBe(true);
  })

  it ("absolute path /test_path", () => {
    expect(isSafeRedirect("/test_path", host)).toBe(true);
  })

  it ("relative path /test_path", () => {
    expect(isSafeRedirect("test_path", host)).toBe(true);
  })

  // Confirmed that this will not redirect to "myhost.com"
  // Instead, it redirected to "/sessions/myhost.com" (processed as relative URL)
  it ("host without protocol", () => {
    expect(isSafeRedirect("myhost.com", host)).toBe(true);
  })

  it ("protocol is http and host is same", () => {
    expect(isSafeRedirect("http://myhost.com/test_path", host)).toBe(true);
  })

  it ("protocol is http and host is same and ports are set", () => {
    expect(isSafeRedirect("http://myhost.com:3000/test_path", host + ":3000")).toBe(true);
  })

  it ("protocol is http and host is same and ports are different", () => {
    expect(isSafeRedirect("http://myhost.com/test_path", host + ":3000")).toBe(false);
  })

  it ("protocol is https and host is same", () => {
    expect(isSafeRedirect("https://myhost.com/test_path", host)).toBe(true);
  })

  it ("protocol is file and host is same", () => {
    expect(isSafeRedirect("file://myhost.com/test_path", host)).toBe(true);
  })

  it ("protocol is http and host is different", () => {
    expect(isSafeRedirect("http://evilpage.com/test_path", host)).toBe(false);
  })

  it ("protocol is http and host is null", () => {
    expect(isSafeRedirect("http://evilpage.com/test_path", null)).toBe(false);
  })
})
