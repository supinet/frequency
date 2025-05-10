SELECT
    userTherapy.*,
    patient.name patientName,
    applicator.name applicatorName,
    tutor.name tutorName,
    therapy.title therapyTitle
FROM
    "UserTherapy" userTherapy
    INNER JOIN "User" patient on patient.id = userTherapy."patientId"
    INNER JOIN "User" applicator on applicator.id = userTherapy."applicatorId"
    INNER JOIN "User" tutor on tutor.id = userTherapy."tutorId"
    INNER JOIN "Therapy" therapy on therapy.id = userTherapy."therapyId"