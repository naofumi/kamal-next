export function ParseStringAsBoolean(arg: string | number | boolean | undefined): boolean {
  const falseValues = [false, 0, "0", "f", "F", "false", "FALSE", "off", "OFF"]
  if (typeof arg === "undefined" || falseValues.indexOf(arg) !== -1) {
    return false
  } else {
    return true
  }
}

export function ParseStringAsNumber(arg: string | number | undefined | null) {
  if (typeof arg === "undefined" || arg === null || arg === "") {
    return null
  } else {
    const result = Number(arg)
    if (Number.isNaN(result)) { return null }
    return result
  }
}
