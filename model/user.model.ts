import {DataTypes} from '@sequelize/core'
import sequelize from '../config/db.config'

const userModel = sequelize.define('user', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    profile: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

userModel.sync({alter: true})

export default userModel