from django.db import models
class Tour(models.Model):
    IdTour = models.BigAutoField(primary_key= True)
    TourName = models.CharField(max_length=225)
    TourDestination = models.CharField(max_length=225)
    TourPrice = models.IntegerField()
    Distance = models.IntegerField(null=True)
    Address = models.CharField(max_length=225, null=True)
    Desc = models.CharField(max_length=225, null=True)
    Photo = models.CharField(max_length=225, null=True)
    Featured = models.BooleanField(null=True)
