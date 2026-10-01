from celery import shared_task
from django.core.mail import send_mail


@shared_task(
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=True,
    max_retries=3,
)
def send_notification_email(
    self,
    email,
    username,
    subject,
    message,
):
    send_mail(
        subject=subject,
        message=message,
        from_email="realestateadmin@example.com",
        recipient_list=[email],
    )

    return "Notification email sent"