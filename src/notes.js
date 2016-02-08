
function isNote (note) {
  return /^[A-G](#|b)?(\d+)?$/i.test(note)
}

export default {isNote}
