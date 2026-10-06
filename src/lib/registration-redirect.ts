export function getRegistrationRedirect(
  search: string,
): "/" | "/apply-for-landlord" {
  return new URLSearchParams(search).get("redirect") === "/apply-for-landlord"
    ? "/apply-for-landlord"
    : "/";
}
