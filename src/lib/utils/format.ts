export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const capitalizeSentence = (sentence: string) => {
  return sentence.split(' ').map(capitalizeWord).join(' ')
}

export const leaveSingleSpaceBetweenWords = (sentence: string) => {
  return sentence.replace(/\s+/g, ' ')
}

export const formatAsUSDCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const formatName = (name: string) => {
  return capitalizeSentence(leaveSingleSpaceBetweenWords((name as string).trim())) 
}

export const formatEmail = (email: string) => {
  return email.trim().toLowerCase()
}
