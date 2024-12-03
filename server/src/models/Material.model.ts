import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({
    tableName: 'material_didactico',
    timestamps: false,
    freezeTableName: true
})
class MaterialDidactico extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id_material_didactico: number;

    @Column({
        type: DataType.STRING
    })
    declare tipo: string;

    @Column({
        type: DataType.STRING
    })
    declare url: string;
}

export default MaterialDidactico;
