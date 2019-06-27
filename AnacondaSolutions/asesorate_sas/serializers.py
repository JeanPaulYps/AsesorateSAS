# -*- coding: utf-8 -*-
from django.contrib.auth.models import User, Group
from rest_framework import serializers
#importar los modelos creados
from AnacondaSolutions.asesorate_sas.models import Estudiante

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
        
class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = ('nombre','cedula','correo','contraseña','telefono','direccion','usuario')

class CotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = ('id_estudiante','horas','id_categoria','precio')


   
