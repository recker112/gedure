//Se crea una acciรณn la cual será capturada
//por el reducer correspondiente.
const updateWallet = (balance) => {
  return {
    type: "UPDATE_WALLET_USER",
		payload: {
			balance
		},
  }
}

export default updateWallet;