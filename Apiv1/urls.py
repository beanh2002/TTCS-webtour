from django.urls import path
from .views import Alltour, tourid, toursearch, Login, Signup,ahihi, ahihi1, giaima, Booking, Info, getnguoidung, themttngdung, ChangePasswordView, HotList

urlpatterns = [
    path('Alltour',Alltour.as_view()),
    path('tour/<int:id>',tourid.as_view()),
    path('toursearch/<str:ten>', toursearch.as_view()),
    path('login',Login.as_view()),
    path('signup',Signup.as_view() ),
    path('delete/<int:id>',ahihi.as_view()),
    path('new', ahihi1.as_view()),
    path('giaima',giaima.as_view()),
    path('booking', Booking.as_view()),
    path('info', Info.as_view()),
    path('nguoidung', getnguoidung.as_view()),
    path('themttnguoidung', themttngdung.as_view()),
    path('changepassword', ChangePasswordView.as_view()),
    path('hottour',HotList.as_view()),
]