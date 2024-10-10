const clients = [
  {
    id: 1,
    taxNumber: "86620855",
    name: "HECTOR ACUÑA BOLAÑOS",
  },
  {
    id: 2,
    taxNumber: "7317855K",
    name: "JESUS RODRIGUEZ ALVAREZ",
  },
  {
    id: 3,
    taxNumber: "73826497",
    name: "ANDRES NADAL MOLINA",
  },
  {
    id: 4,
    taxNumber: "88587715",
    name: "SALVADOR ARNEDO MANRIQUEZ",
  },
  {
    id: 5,
    taxNumber: "94020190",
    name: "VICTOR MANUEL ROJAS LUCAS",
  },
  {
    id: 6,
    taxNumber: "99804238",
    name: "MOHAMED FERRE SAMPER",
  },
];
const accounts = [
  {
    clientId: 6,
    bankId: 1,
    balance: 15000,
  },
  {
    clientId: 1,
    bankId: 3,
    balance: 18000,
  },
  {
    clientId: 5,
    bankId: 3,
    balance: 135000,
  },
  {
    clientId: 2,
    bankId: 2,
    balance: 5600,
  },
  {
    clientId: 3,
    bankId: 1,
    balance: 23000,
  },
  {
    clientId: 5,
    bankId: 2,
    balance: 15000,
  },
  {
    clientId: 3,
    bankId: 3,
    balance: 45900,
  },
  {
    clientId: 2,
    bankId: 3,
    balance: 19000,
  },
  {
    clientId: 4,
    bankId: 3,
    balance: 51000,
  },
  {
    clientId: 5,
    bankId: 1,
    balance: 89000,
  },
  {
    clientId: 1,
    bankId: 2,
    balance: 1600,
  },
  {
    clientId: 5,
    bankId: 3,
    balance: 37500,
  },
  {
    clientId: 6,
    bankId: 1,
    balance: 19200,
  },
  {
    clientId: 2,
    bankId: 3,
    balance: 10000,
  },
  {
    clientId: 3,
    bankId: 2,
    balance: 5400,
  },
  {
    clientId: 3,
    bankId: 1,
    balance: 9000,
  },
  {
    clientId: 4,
    bankId: 3,
    balance: 13500,
  },
  {
    clientId: 2,
    bankId: 1,
    balance: 38200,
  },
  {
    clientId: 5,
    bankId: 2,
    balance: 17000,
  },
  {
    clientId: 1,
    bankId: 3,
    balance: 1000,
  },
  {
    clientId: 5,
    bankId: 2,
    balance: 600,
  },
  {
    clientId: 6,
    bankId: 1,
    balance: 16200,
  },
  {
    clientId: 2,
    bankId: 2,
    balance: 10000,
  },
];
const banks = [
  {
    id: 1,
    name: "SANTANDER",
  },
  {
    id: 2,
    name: "CHILE",
  },
  {
    id: 3,
    name: "ESTADO",
  },
];

//* 0 Arreglo con los ids de clientes

const listClientsIds = () => {
  return clients.map((client) => client.id);
};

//* 1 Arreglo con los ids de clientes ordenados por rut

const listClientsIdsSortByTaxNumber = () => {
  const clientsSortedByTaxNumber = clients.toSorted((a, b) => {
    const taxNumberA = a.taxNumber.toUpperCase();
    const taxNumberB = b.taxNumber.toUpperCase();
    if (taxNumberA < taxNumberB) {
      return -1;
    }
    if (taxNumberA > taxNumberB) {
      return 1;
    }

    return 0;
  });

  return clientsSortedByTaxNumber.map((client) => client.id);
};

//* 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.

const sortClientsTotalBalances = () => {
  const clientsTotalBalances = [];
  accounts.forEach((account) => {
    const { clientId, balance } = account;

    if (clientsTotalBalances.length === 0) {
      clientsTotalBalances.push({ clientId, balance });
      return;
    }

    const index = clientsTotalBalances.findIndex(
      (client) => client.clientId === clientId
    );

    if (index === -1) {
      clientsTotalBalances.push({ clientId, balance });
    } else {
      clientsTotalBalances[index].balance += balance;
    }
  });
  clientsTotalBalances.sort((a, b) => b.balance - a.balance);

  return clientsTotalBalances.map((clientBalance) => {
    const currentClient = clients.find(
      (client) => client.id === clientBalance.clientId
    );
    return currentClient.name;
  });
};

//* 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.

const banksClientsTaxNumbers = () => {
  const resultBanks = {};

  banks.forEach((bank) => {
    let clientsIds = accounts
      .filter((account) => account.bankId === bank.id)
      .map((account) => account.clientId);

    const clientsIdsSet = new Set(clientsIds);
    clientsIds = [...clientsIdsSet];

    resultBanks[bank.name] = { id: bank.id, clients: clientsIds };
  });

  for (const bank in resultBanks) {
    const clientsData = resultBanks[bank].clients.map((client) =>
      clients.find((item) => item.id === client)
    );
    clientsData.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    resultBanks[bank] = clientsData.map((data) => data.taxNumber);
  }
  return resultBanks;
};

//* 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER

const richClientsBalances = () => {
  const BANK_NAME = "SANTANDER";
  const idSantander = banks.find((bank) => bank.name === BANK_NAME).id;
  const santanderAccounts = accounts.filter(
    (account) => account.bankId === idSantander
  );

  const santanderClientsBalance = [];
  santanderAccounts.forEach((account) => {
    const { clientId, balance } = account;

    if (santanderClientsBalance.length === 0) {
      santanderClientsBalance.push({ clientId, balance });
      return;
    }

    const index = santanderClientsBalance.findIndex(
      (client) => client.clientId === clientId
    );

    if (index === -1) {
      santanderClientsBalance.push({ clientId, balance });
    } else {
      santanderClientsBalance[index].balance += balance;
    }
  });
  return santanderClientsBalance
    .sort((a, b) => b.balance - a.balance)
    .map((client) => client.balance);
};

//* 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
const banksRankingByTotalBalance = () => {
  const totalBanksBalance = [];

  accounts.forEach((account) => {
    const { bankId, balance } = account;

    if (totalBanksBalance.length === 0) {
      totalBanksBalance.push({ bankId, balance });
      return;
    }

    const index = totalBanksBalance.findIndex((bank) => bank.bankId === bankId);

    if (index === -1) {
      totalBanksBalance.push({ bankId, balance });
    } else {
      totalBanksBalance[index].balance += balance;
    }
  });
  totalBanksBalance.sort((a, b) => a.balance - b.balance);
  return totalBanksBalance.map((item) => item.bankId);
};

//* 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.

const banksFidelity = () => {
  let banksPerClient = [];

  clients.forEach((client) => {
    let banksIds = accounts
      .filter((account) => account.clientId === client.id)
      .map((account) => account.bankId);
    const banksPerClientSet = new Set(banksIds);
    banksIds = [...banksPerClientSet];

    banksPerClient.push({ clientId: client.id, banksIds });
  });

  const loyalClients = banksPerClient.filter(
    (item) => item.banksIds.length === 1
  );

  let result = {};
  banks.forEach((bank) => (result[bank.name] = 0));
  loyalClients.forEach((client) => {
    const bankName = banks.find((bank) => bank.id === client.banksIds[0]).name;
    result[bankName]++;
  });
  return result;
};

//* 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.

const banksPoorClients = () => {
  let banksClientsBalance = {};
  banks.forEach((bank) => {
    const accountsPerBank = accounts.filter(
      (account) => account.bankId === bank.id
    );
    const clientsTotalBalances = [];
    accountsPerBank.forEach((account) => {
      const { clientId, balance } = account;

      if (clientsTotalBalances.length === 0) {
        clientsTotalBalances.push({ clientId, balance });
        return;
      }

      const index = clientsTotalBalances.findIndex(
        (client) => client.clientId === clientId
      );

      if (index === -1) {
        clientsTotalBalances.push({ clientId, balance });
      } else {
        clientsTotalBalances[index].balance += balance;
      }
    });

    clientsTotalBalances.sort((a, b) => a.balance - b.balance);

    banksClientsBalance[bank.name] = clientsTotalBalances[0].balance;
  });

  return banksClientsBalance;
};

//* 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.

const newClientRanking = () => {
  const newClient = {
    id: clients.length + 1,
    taxNumber: "364264234",
    name: "VICTOR HUGO MORALES",
  };
  const newAccount = {
    clientId: newClient.id,
    bankId: banks.find((bank) => bank.name === "ESTADO").id,
    balance: 56565,
  };
  clients.push(newClient);
  accounts.push(newAccount);
  const sortedClients = sortClientsTotalBalances();
  const ranking =
    sortedClients.findIndex((client) => client === newClient.name) + 1;

  return ranking;
};

//* Impresión de soluciones. No modificar.
console.log("Pregunta 0");
console.log(listClientsIds());
console.log("Pregunta 1");
console.log(listClientsIdsSortByTaxNumber());
console.log("Pregunta 2");
console.log(sortClientsTotalBalances());
console.log("Pregunta 3");
console.log(banksClientsTaxNumbers());
console.log("Pregunta 4");
console.log(richClientsBalances());
console.log("Pregunta 5");
console.log(banksRankingByTotalBalance());
console.log("Pregunta 6");
console.log(banksFidelity());
console.log("Pregunta 7");
console.log(banksPoorClients());
console.log("Pregunta 8");
console.log(newClientRanking());
