
from django.contrib.auth.models import User, Group
from rest_framework import viewsets

#importar los modelos creados
from AnacondaSolutions.asesorate_sas.models import Estudiante
from AnacondaSolutions.asesorate_sas.serializers import EstudianteSerializer
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView

#EstudianteSerializer
from AnacondaSolutions.asesorate_sas.serializers import UserSerializer, GroupSerializer,EstudianteSerializer
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
    
 
class EstudianteViewSet(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'RegistroUsuario.html'

    def get(self, request, pk):
        estudiante = get_object_or_404(estudiante, pk=pk)
        serializer = EstudianteSerializer
        return Response({'serializer': serializer, 'estudiante': estudiante})

    def post(self, request, pk):
        estudiante = get_object_or_404(estudiante, pk=pk)
        serializer = EstudianteSerializer
        if not serializer.is_valid():
            return Response({'serializer': serializer, 'estudiante':estudiante})
        serializer.save()
        return redirect('RegistroUsuario')




