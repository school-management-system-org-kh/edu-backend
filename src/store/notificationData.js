const notifications = [
  {
    event: 'Exam Result',
    destinations: { email: true, sms: false, app: false },
    recipients: { student: true, guardian: true },
    sampleMessage: "Dear {{student_name}} - {{exam_roll_no}}, your {{exam}} result has been published."
  },
  {
    event: 'CBSE Exam Result',
    destinations: { email: true, sms: false, app: false },
    recipients: { student: true, guardian: true },
    sampleMessage: "Dear {{student_name}} - {{roll_no}}, your {{exam}} result has been published."
  },
  {
    event: 'CBSE Exam Markseet Pdf',
    destinations: { email: true, sms: false, app: false },
    recipients: { student: true, guardian: true },
    sampleMessage: "Dear {{student_name}} ({{admission_no}}) {{class}} Section {{section}}. We have mailed you the marksheet with Roll no.{{roll_no}}"
  },
  {
    event: 'Behaviour Incident Assigned',
    destinations: { email: true, sms: false, app: false },
    recipients: { student: true, guardian: true },
    sampleMessage: "A new {{incident_title}} behaviour incident with {{incident_point}} point is assigned on you..."
  },
  {
    event: 'Online Course Guest User Sign Up',
    destinations: { email: true, sms: false, app: false },
    recipients: { student: true, guardian: true },
    sampleMessage: "Dear {{guest_user_name}} you have successfully sign up with Email: {{email}} Url {{url}}"
  }
];

export default notifications;