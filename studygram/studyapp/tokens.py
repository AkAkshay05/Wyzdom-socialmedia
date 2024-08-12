from django.contrib.auth.tokens import PasswordResetTokenGenerator

class UnverifiedUserTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        # Customize the hash value to work with UnverifiedUser
        return f"{user.pk}{timestamp}{user.email}"

unverified_user_token_generator = UnverifiedUserTokenGenerator()
