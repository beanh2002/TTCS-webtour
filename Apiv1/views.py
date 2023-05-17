from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from core.RoleDecorator import RoleRequest
from Entity.models.Tour import Tour
from Entity.models.User import User
from Entity.models.TourUser import TourUser
from Entity.models.Role import Role
from Entity.models.RoleUser import RoleUser
from datetime import datetime, timedelta
from django.db.models import Count
import jwt
from PIL import Image
import io
import base64
from datetime import datetime,timedelta,timezone,date
import json
from django.db.models import F
import os
from core.settings import MEDIA_ROOT
from django.contrib.auth.hashers import make_password
from core.settings import BASE_DIR
class Alltour(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['NormalUser','admin',]))
    def get(self, request):
        tours = Tour.objects.all()
        tourList = []

        for tour in tours:
            tourList.append({"id":tour.IdTour, "title":tour.TourName, "city":tour.TourDestination, "distance":tour.Distance, "address":tour.Address, "desc":tour.Desc, "photo":tour.Photo, "featured":tour.Featured,"reviews": [
      {
        "name": "Ngọc",
        "rating": 4.6,
      },
      {
        "name": "Triển",
        "rating": 5,
      },
    ],
    "avgRating": 4.5,
    "price":tour.TourPrice})

        return Response(tourList, status=200)
    

class HotList(APIView):
    def get(self, request):
        thirty_days_ago = datetime.now() - timedelta(days=30)

        tours = Tour.objects.annotate(num_bookings=Count('touruser')).order_by('-num_bookings').filter(touruser__Date__gte=thirty_days_ago)
        tour_data = [{"id":tour.IdTour, "title":tour.TourName, "city":tour.TourDestination, "distance":tour.Distance, "address":tour.Address, "desc":tour.Desc, "photo":tour.Photo, "featured":tour.Featured,"reviews": [
      {
        "name": "Ngọc",
        "rating": 4.6,
      },
      {
        "name": "Triển",
        "rating": 5,
      },
    ],
    "avgRating": 4.5,
    "price":tour.TourPrice} for tour in tours]
        
        return Response(tour_data, status=200)

    
class tourid(APIView):
    def get(self, request, id):
        tour = Tour.objects.get(IdTour=id)
        tourList={"id":tour.IdTour, "title":tour.TourName, "city":tour.TourDestination, "distance":tour.Distance, "address":tour.Address, "desc":tour.Desc, "photo":tour.Photo, "featured":tour.Featured,     "reviews": [
      {
        "name": "Ngọc",
        "rating": 4.6,
      },
      {
        "name": "Triển",
        "rating": 5,
      },
    ],
    "avgRating": 4.5,
    "maxGroupSize":8,
    "price":tour.TourPrice}

        return Response(tourList, status=200)
    
class toursearch(APIView):
    def get(self, request, ten):
        tours = Tour.objects.filter(TourName__icontains=ten)
        tourList = []

        for tour in tours:
            tourList.append({"id":tour.IdTour, "title":tour.TourName, "city":tour.TourDestination, "distance":tour.Distance, "address":tour.Address, "desc":tour.Desc, "photo":tour.Photo, "featured":tour.Featured,     "reviews": [
      {
        "name": "Ngọc",
        "rating": 4.6,
      },
      {
        "name": "Triển",
        "rating": 5,
      },
    ],
    "avgRating": 4.5,
    "price":tour.TourPrice})

        return Response(tourList, status=200)
    
class Login(APIView):
    def post(self, request):
        exp=datetime.now(tz=timezone.utc) + timedelta(minutes=50)
        if  'username' not in request.data:
            return Response(json.dumps({"massage":"Chưa nhập tên tài khoản"}),status=200)
        userName = request.data['username']
        if  'password' not in request.data:
            return Response(json.dumps({"massage":"Chưa nhập mật khẩu"}),status=400)    
        password = request.data['password']
        try:
            user = User.objects.get(UserName=userName,UserPassword=password)
            role = Role.objects.filter(userrole__User=user)
            roleList=[]
            for i in role:
                roleList.append(i.NameRole)
        except:
            return Response(json.dumps({"massage":"Sai tài khoản"}),status=401) 
        encoded_jwt = jwt.encode({"userID": user.idUser,"Roles":roleList,"exp":exp}, "ngoc", algorithm="HS256")
        return Response({"access__token":encoded_jwt},status=201)
    

class Signup(APIView):
    def post(self,request):
        if  'username' not in request.data:
            return Response(json.dumps({"massage":"nhap tk di"}),status=400)
        userName = request.data['username']
        
        try:
            User.objects.get(UserName=userName)
            return Response(json.dumps({"massage":"usernam da ton tai"}),status=409)
        except:
            if  'password' not in request.data:
                return Response({"massage":"nhap pass di"},status=400)    
            password = request.data['password']
            newUser =User(UserName=userName,UserPassword=password)
            role=Role.objects.get(pk=2)
            newUser.save()
            newRole=RoleUser(Role=role,User=newUser)
            newRole.save()
        encoded_jwt = jwt.encode({"userID": newUser.idUser}, "ngoc", algorithm="HS256")
        return Response({"access__token":encoded_jwt},status=201)


class ahihi(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['NormalUser','admin',]))
    # def get(self, request):
    #   return Response({"access__token":"encoded_jwt"},status=201)class Delete(APIView):
    @method_decorator(RoleRequest(allowedRoles=['admin']))
    def delete(self,request,id):
        tour = Tour.objects.get(pk=id)
        tour.delete()
       
        return Response({"massage":'da xoa'},status=201)
    
    @method_decorator(RoleRequest(allowedRoles=['admin']))
    def put(self, request, id):
        tour = Tour.objects.get(pk=id)
        tourName = request.data['tourname']
        Image = request.FILES.get('photo')     
        
        if Image:
            image_path = os.path.join(MEDIA_ROOT,Image.name)[:-4]+'(0).png'
            check=0
            while  os.path.isfile(image_path) :
                check+=1
                image_path = os.path.join(MEDIA_ROOT, Image.name)[:-4]+'('+str(check)+').png'
        
            with open(image_path, 'wb') as f:
                for chunk in Image.chunks():
                    f.write(chunk)
            Image=image_path[len(os.path.join(BASE_DIR)):] 
        tourDestination = request.data['tourdestination']
        tourPrice = request.data['tourprice']
        distan = request.data['distance']
        add = request.data['address']
        des = request.data['desc']
        phoTo = request.data['photo']
        featur = request.data['featured']
        tour.TourName=tourName
        tour.TourDestination=tourDestination
        tour.TourPrice=tourPrice
        tour.Distance = distan
        tour.Address = add
        tour.Desc = des
        tour.Photo = Image
        tour.Featured= featur
        tour.save()
        encoded_jwt = jwt.encode({"userID": tour.IdTour}, "ngoc", algorithm="HS256")
        return Response({"access__token":encoded_jwt},status=201)
    
class ahihi1(APIView):
    @method_decorator(RoleRequest(allowedRoles=['admin']))
    def put(self, request):
        tourName = request.data['tourname']
        tourDestination = request.data['tourdestination']
        tourPrice = request.data['tourprice']
        distan = request.data['distance']
        add = request.data['address']
        des = request.data['desc']
        
        Image = request.FILES.get('photo')     
        
        if Image:
            image_path = os.path.join(MEDIA_ROOT,Image.name)[:-4]+'(0).png'
            check=0
            while  os.path.isfile(image_path) :
                check+=1
                image_path = os.path.join(MEDIA_ROOT, Image.name)[:-4]+'('+str(check)+').png'
        
            with open(image_path, 'wb') as f:
                for chunk in Image.chunks():
                    f.write(chunk)
            Image=image_path[len(os.path.join(BASE_DIR)):] 
    
        featur = request.data['featured']
        newTour = Tour(TourName= tourName, TourDestination= tourDestination, TourPrice= tourPrice, Distance= distan, Address= add, Desc= des, Photo= Image, Featured= featur)
        newTour.save()
        encoded_jwt = jwt.encode({"userID": newTour.IdTour}, "ngoc", algorithm="HS256")
        return Response({"access__token":encoded_jwt},status=201)

class giaima(APIView):
    def get(self, request):
        return Response({"Roles":request.roles},status=200)
    

class Booking(APIView):
    def post(self, request):
        fullName = request.data['fullname']
        Phone = request.data['phone']
        Date = datetime.now()
        Guest = request.data['guest']
        tourID = request.data['tourID']
        totalAmount = request.data['totalamount']
        user = User.objects.get(pk=request.userID)
        tour =Tour.objects.get(pk=tourID)
        userTournew =TourUser(User=user,Tour=tour,Fullname=fullName,Phone=Phone,Date=Date,Guest=Guest, TotalAmount = totalAmount)
        userTournew.save()

        return Response({"userTourID":userTournew.pk},status=201)
    
class Info(APIView):
    def get(self, request):
        tour_users = TourUser.objects.filter(User_id=request.userID).annotate(
            fullname=F('Fullname'),
            phone=F('Phone'),
            tourname=F('Tour__TourName'),
            date=F('Date'),
            guest=F('Guest'),
            total=F('TotalAmount')
        ).values('phone', 'tourname', 'date', 'fullname', 'guest', 'total').order_by('-TourUser')

        tour_info_list = list(tour_users)
        return Response(tour_info_list, status=200)
    
class getnguoidung(APIView):
    def get(self, request):
        user = User.objects.get(idUser = request.userID)
        userlist={"username":user.UserName, "useremail":user.UserEmail, "userdob":user.UserDob}
        return Response(userlist, status=200)
    
class themttngdung(APIView):
    def post(self, request):
        user = User.objects.get(idUser = request.userID)
        Email = request.data['email']
        Dob = request.data['dob']
        user.UserEmail = Email
        user.UserDob = Dob
        user.save()
        encoded_jwt = jwt.encode({"userID": user.idUser}, "ngoc", algorithm="HS256")
        return Response({"access__token":encoded_jwt},status=201)


class ChangePasswordView(APIView):
    def post(self, request):
        user = User.objects.get(idUser = request.userID)
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if user.UserPassword == old_password:
            user.UserPassword = new_password
            user.save()
            return Response({'message': 'Password updated successfully.'}, status=200)
        else:
            return Response({'error': 'Wrong old password.'}, status=400)
