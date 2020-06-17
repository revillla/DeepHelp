const { Users, Toggle } = require("../database/db")
const toggleable = new Map();

Toggle.findAll({}).then(res => {
    if (res.length > 0) {
        let support = res[0].support;
        toggleable.set('support', { enabled: support })

    } else {
        toggleable.set('support', { enabled: true })
        Toggle.create()
    }
})

module.exports = toggleable