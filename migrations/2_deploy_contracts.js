const {TOTAL_SUPPLY_UCANA, TOTAL_SUPPLY_UCANU, TOTAL_SUPPLY_UCANE, AMOUNT_TO_UCANA_TO_EXCHANGE, AMOUNT_TO_UCANU_TO_EXCHANGE, AMOUNT_TO_UCANE_TO_EXCHANGE, AMOUNT_UCANA_TO_STUDENTS, AMOUNT_UCANU_TO_STUDENTS, AMOUNT_UCANE_TO_STUDENTS} = require('./config_file');


const Token = artifacts.require("Token");
const Token2 = artifacts.require("Token2");
const Token3 = artifacts.require("Token3");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
    // Deploy Token
    await deployer.deploy(Token, TOTAL_SUPPLY_UCANA);
    const token = await Token.deployed()

    await deployer.deploy(Token2, TOTAL_SUPPLY_UCANU);
    const token2 = await Token2.deployed()

    await deployer.deploy(Token3, TOTAL_SUPPLY_UCANE);
    const token3 = await Token3.deployed()

    // Deploy EthSwap
    await deployer.deploy(EthSwap, token.address, token2.address, token3.address);
    const ethSwap = await EthSwap.deployed()

    // Transfer all tokens to EthSwap (1 million)
    await token.transfer(ethSwap.address,  AMOUNT_TO_UCANA_TO_EXCHANGE); // UCANA
    await token2.transfer(ethSwap.address, AMOUNT_TO_UCANU_TO_EXCHANGE); // UCANU
    await token3.transfer(ethSwap.address, AMOUNT_TO_UCANE_TO_EXCHANGE); // UCANE

    await ethSwap.sortInitialPivo();
  
    console.log('Quant tokens 1 exchange')
    console.log((await token.balanceOf(ethSwap.address)).toString());
    console.log('Quant tokens 2 exchange')
    console.log((await token2.balanceOf(ethSwap.address)).toString());
    console.log('Quant tokens 3 exchange')
    console.log((await token3.balanceOf(ethSwap.address)).toString());

    const accounts = [
        '0x6Bfe867d3BaEFf60122441eBd38f6331Ba1423E4',
        '0xBE514F502E3Bd956e24c5742b02809c7Dab8Dc40',
        '0x32f174056c89dAB87bb39562b599A3b7264eF37b',
        '0x2b976aAaF63DAb696064d654b6850077c5C74a3c',
        '0x327E301f1de40f107Ab7fA199A337ea5bC6eB351',
        '0xD53488049fafC8CE778b10e84bc836dBbf96c2A7',
        '0x7181C2d42F6b852B4fE6424f6a94Cc3e849270F3',
        '0x65298C3B11904ADd549c006FE80a93222205E198',
        '0x9641d7bEbF6916fD8A0316E3D9d0121d0802c742'
      ];

      // Meio milhão, valor máximo a ser distribuido 5000 por conta

      for (let accountIndex = 0; accountIndex < accounts.length; accountIndex++) {
        console.log("Account " + accountIndex + "º " + accounts[accountIndex])
        await token.transfer(accounts[accountIndex], AMOUNT_UCANA_TO_STUDENTS)
        await token2.transfer(accounts[accountIndex], AMOUNT_UCANU_TO_STUDENTS)
        await token3.transfer(accounts[accountIndex], AMOUNT_UCANE_TO_STUDENTS)
      }
};
