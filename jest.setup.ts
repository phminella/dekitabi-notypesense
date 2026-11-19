import "@testing-library/jest-dom";

jest.mock("@googlemaps/typescript-guards", () => ({
  isLatLngLiteral: jest.fn(() => true),
  isCircleLiteral: jest.fn(() => true),
  isCircleOrCircleLiteral: jest.fn(() => true),
  isLatLngOrLatLngLiteral: jest.fn(() => true),
  isLatLngBoundsLiteral: jest.fn(() => true),
  isLatLngBoundsOrLatLngBoundsLiteral: jest.fn(() => true),
}));
