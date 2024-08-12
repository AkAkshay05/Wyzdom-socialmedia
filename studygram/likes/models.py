from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from posts.models import Post  # Ensure you have the Post model in the posts app

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')

    class Meta:
        unique_together = ['user', 'post']  # Prevents multiple likes from the same user on the same post

    def __str__(self):
        return f'{self.user} likes {self.post}'
