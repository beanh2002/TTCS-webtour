from django.db import models
from .User import User
from .Tour import Tour
class History(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    Reviews = models.CharField(max_length=225)
    Avgrating = models.FloatField(null=True)