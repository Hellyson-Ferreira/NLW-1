const sqlite = require("sqlite3").verbose()

/// intanciando objeto
const db = new sqlite.Database("./src/database/databese.db")

db.serialize(() => {
    ///Crindo tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT

        );
    `)
    //Inserindo dados
    const query = `

            INSERT INTO places(
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            )VALUES(?,?,?,?,?,?,?)
    `
    const values = [
        "https://s3-alpha-sig.figma.com/img/ffe1/8625/5dd8d5f9a1f2ff3afacbc638233d8609?Expires=1592179200&Signature=GiMmIlCiWvwvggmbJ4k15AcC7h912sL1DiPu2hV5uapoy~UF9nbhA9UOZOxMBUScZZXsS-9Trv6cb~JwQ7p3sbOZTNLaZmR6KGMcHroxQPBcyAp0B9FiLH2dcplAScmwmu0nHatUG0vPLVqG1GRWAoSzbDuIjx1HCRg4~BCD195scYPTkrLepdxAxQ-kFOwhdv9VcU5CZv~rLydlmGbWNtWwo3I1XYdaihVof9q1FvfR30pGlTfoogjdu~36giHZ-X3pFJBlVEAwiDcU1bvU6~Vcs~8jMv9W9RtkTNGMrFVOqjVsCzzuS9FEHtriUW2CD29xA6SJkr9bQBODs4IRqg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        "Coletoria",
        "Guilherme Gemballa,Jardin América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Residuaos Eletônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)

        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    db.run(query,values,afterInsertData)

    ///Consultar dados dados 
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log('Aqui estão seus dados')
        console.log(rows)
    })

    //Deletar dados
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log('Registro deletado')

    // }

    // )
})