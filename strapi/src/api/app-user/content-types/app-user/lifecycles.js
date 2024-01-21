module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    event.params.data.UUID = crypto.randomUUID();
  }
}
