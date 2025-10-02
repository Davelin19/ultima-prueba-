import mysql.connector
from mysql.connector import Error

try:
    # Conectar a la base de datos
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='armony_stetic'
    )
    
    if conn.is_connected():
        cursor = conn.cursor()
        
        # Primero eliminar las referencias en facturas
        cursor.execute("DELETE FROM facturas WHERE id_pago IN (SELECT id_pago FROM pagos)")
        print(f"Registros relacionados en facturas eliminados: {cursor.rowcount}")
        
        # Ahora limpiar datos existentes en pagos
        cursor.execute("DELETE FROM pagos")
        print("Datos de pagos anteriores eliminados")
        
        # Obtener la estructura de la tabla pagos
        cursor.execute("DESCRIBE pagos")
        columns = [column[0] for column in cursor.fetchall()]
        print(f"Columnas en la tabla pagos: {', '.join(columns)}")
        
        # Insertar nuevos datos adaptados a la estructura actual
        pagos_data = [
            (1, 1, 1, '2024-01-15', 240000.00, 'tarjeta', 'completado', 'Pago por masaje corporal'),
            (2, 2, 2, '2024-01-20', 180000.00, 'efectivo', 'completado', 'Pago por limpieza facial'),
            (3, 3, 1, '2024-02-10', 200000.00, 'transferencia', 'completado', 'Pago por tratamiento capilar'),
            (3, 4, 3, '2024-02-15', 140000.00, 'tarjeta', 'completado', 'Pago por manicura'),
            (1, 5, 2, '2024-03-01', 160000.00, 'efectivo', 'completado', 'Pago por pedicura'),
            (2, 1, 1, '2024-03-05', 240000.00, 'tarjeta', 'pendiente', 'Pago pendiente por masaje corporal'),
            (3, 2, 3, '2024-03-10', 180000.00, 'transferencia', 'fallido', 'Pago fallido por limpieza facial'),
            (1, 3, 2, '2024-03-15', 200000.00, 'tarjeta', 'reembolsado', 'Pago reembolsado por tratamiento capilar')
        ]
        
        insert_query = """
        INSERT INTO pagos (id_cliente, id_tratamiento, id_admin, fecha_pago, total, metodo_pago, estado_pago, observaciones)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        cursor.executemany(insert_query, pagos_data)
        conn.commit()
        
        print(f"Se insertaron {cursor.rowcount} registros de pagos correctamente")
        
        # Verificar los datos insertados
        cursor.execute("SELECT COUNT(*) FROM pagos")
        count = cursor.fetchone()[0]
        print(f"Total de registros en la tabla pagos: {count}")
        
except Error as e:
    print(f"Error al conectar con MySQL: {e}")
    
finally:
    if conn.is_connected():
        cursor.close()
        conn.close()
        print("Conexión cerrada")