
from django.contrib.auth.models import User, Group
from rest_framework import viewsets

#importar los modelos creados
from AnacondaSolutions.asesorate_sas.models import Estudiante
from AnacondaSolutions.asesorate_sas.serializers import EstudianteSerializer


#EstudianteSerializer
from AnacondaSolutions.asesorate_sas.serializers import UserSerializer, GroupSerializer
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer   
    
class EstudianteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer   
    
    
    




