import {ParseStringAsBoolean, ParseStringAsNumber} from "@/app/helpers/type_helpers"

describe('ParseBoolean()', () => {
  it('0 should return false', () => {
    expect(ParseStringAsBoolean(0)).toBe(false);
  })

  it('"0" should return false', () => {
    expect(ParseStringAsBoolean("0")).toBe(false);
  })

  it('1 should return true', () => {
    expect(ParseStringAsBoolean(1)).toBe(true);
  })

  it('"1" should return true', () => {
    expect(ParseStringAsBoolean("1")).toBe(true);
  })

  it('false should return false', () => {
    expect(ParseStringAsBoolean(false)).toBe(false);
  })

  it('"false" should return false', () => {
    expect(ParseStringAsBoolean("false")).toBe(false);
  })

  it('true should return true', () => {
    expect(ParseStringAsBoolean(true)).toBe(true);
  })

  it('"true" should return true', () => {
    expect(ParseStringAsBoolean("true")).toBe(true);
  })
})



describe('parseStringAsNumber()', () => {
  it('"" should return null', () => {
    expect(ParseStringAsNumber("")).toBe(null)
  })

  it('undefined should return null', () => {
    expect(ParseStringAsNumber(undefined)).toBe(null)
  })

  it('null should return null', () => {
    expect(ParseStringAsNumber(null)).toBe(null)
  })

  it('"foo" should return null', () => {
    expect(ParseStringAsNumber("foo")).toBe(null)
  })

  it('"100" should return 100', () => {
    expect(ParseStringAsNumber("100")).toBe(100)
  })
})
