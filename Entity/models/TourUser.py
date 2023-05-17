from django.db import models
from .User import User
from .Tour import Tour
class TourUser(models.Model):
    TourUser = models.BigAutoField(primary_key=True)
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Tour = models.ForeignKey(Tour, on_delete=models.CASCADE,related_name='touruser')
    Fullname = models.CharField(max_length=225,null= True)
    Phone = models.CharField(max_length=225,null=True)
    Date = models.DateField(null=True)
    Guest = models.IntegerField(null=True)
    TotalAmount = models.IntegerField(null=True)