export const freezeThreadAndWait = async (delay: number): Promise<void> =>
    new Promise(function(resolve) {
        setTimeout(resolve, delay)
    })
