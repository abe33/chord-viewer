
module.exports =
class FretPosition
  @fromObject: (arg) ->
    if arg instanceof FretPosition then arg else new FretPosition(arg)

  constructor: (arg=[]) ->
    if Array.isArray(arg)
      [@string, @fret] = arg
    else
      {@string, @fret} = arg

    @string ?= 0
    @fret ?= 0
