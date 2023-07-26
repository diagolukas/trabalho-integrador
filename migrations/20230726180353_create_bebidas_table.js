// 20230724123456_create_bebidas_table.js

export function up (knex) {
    return knex.schema.createTable('bebidas', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.decimal('preco').notNullable();
      table.string('tipo', 255);
      table.integer('estoque').defaultTo(0);
      table.binary('foto'); // Utilizamos o tipo binary para armazenar a imagem como um blob no banco de dados
    });
  }
  
  export function down (knex) {
    return knex.schema.dropTable('bebidas');
  }
  