import { DataTypes, Model } from "sequelize";
import sequelize from '../../database/index';
// import User from "@infrastructure/database/models/user.model";
import TeacherModel from './teacher.model';

class StudentModel extends Model {};

StudentModel.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        enrolled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        teacherId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'teachers',
                key: 'teacherId',
            },
        },
    },
    {
        sequelize,
        tableName: 'student',
        timestamps: true,
    }
)
StudentModel.belongsTo(TeacherModel, {
    foreignKey: 'teacherId',
    as: 'teacher',
});

export default StudentModel;