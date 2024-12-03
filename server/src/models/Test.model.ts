import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({
    tableName: 'examenes',
    timestamps: false,
    freezeTableName: true
})
class Test extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id_examen: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_curso: number;

    @Column({
        type: DataType.STRING,
    })
    declare titulo: string;

    @Column({
        type: DataType.TEXT,
    })
    declare descripcion: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    declare fecha_creacion: Date;
}

export default Test;
