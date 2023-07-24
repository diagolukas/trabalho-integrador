import { DataTypes} from 'sequelize';
import { sequelize } from '../../projeto-integrador/databases/conecta.js';

export const Bebidas = sequelize.define('bebidas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    estoque: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    foto: {
        type: DataTypes.BLOB('medium'),
        allowNull: false
    }
});