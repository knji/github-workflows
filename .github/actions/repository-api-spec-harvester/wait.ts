export async function wait(milliseconds: number): Promise<string> {
  console.debug("waiting for " + milliseconds + " milliseconds")

  return new Promise(resolve => {
    if (isNaN(milliseconds)) {
      throw new Error('milliseconds not a number')
    }

    setTimeout(() => resolve('done!'), milliseconds)
  })
}