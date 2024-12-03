import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'participacion_foro',
    timestamps: false,
    freezeTableName: true
})
class Forum extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id_participacion: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_usuario: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_curso: number;

    @Column({
        type: DataType.TEXT,
    })
    declare texto_comentario: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    declare fecha_creacion: Date;
}

export default Forum;
