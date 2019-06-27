from django.db import models

# Create your models here.

#MODELO COTIZACIÓN
class Cotizacion(models.Model):
    id = models.AutoField(primary_key=True)
    id_estudiante = models.IntegerField(null= False)
    horas = models.IntegerField(null=False)
    id_categoria = models.TextField(null=False,
    choices=([('JR','JUNIOR'),('SB','SENIOR BASIC'),('SM','SENIOR MEDIUM'),
    ('SA1','SENIOR ADVANCED 1'),('SA2','SENIOR ADVANCED 2')]) )

    #Para consultar el precio, simplemente se llama el metodo get_precio()
    def get_precio(self):
        VALOR_HORA = {
            'JR':33000,
            'SB':44000,
            'SM':50000,
            'SA1':55000,
            'SA2':60000
        }
        return self.horas*VALOR_HORA[self.id_categoria]
        
class Estudiante(models.Model):
    nombre = models.CharField(max_length = 150)
    cedula = models.IntegerField(max_length = 150)
    correo = models.EmailField(max_length = 150)
    contraseña = models.CharField(max_length = 150)
    telefono = models.IntegerField(max_length = 150)
    direccion = models.CharField(max_length = 150)
    usuario = models.CharField(max_length = 150)