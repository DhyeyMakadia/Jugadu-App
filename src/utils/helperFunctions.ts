export const preventNonNumericalInput = (
  e: any
) => {
  e = e || window.event;
  const charCode = typeof e.which === "undefined" ? e.keyCode : e.which;
  const charStr = String.fromCharCode(charCode);
  if (charCode === 13) return true;

  if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
};