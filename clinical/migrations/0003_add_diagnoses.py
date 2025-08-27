from django.db import migrations


def add_diagnoses(apps, schema_editor):
    Diagnosis = apps.get_model("clinical", "Diagnosis")
    diagnoses = [
        (1, 'Hypertension', 'I10', 'A condition in which the force of the blood against the artery walls is too high.'),
        (2, 'Type 2 Diabetes Mellitus', 'E11', 'A chronic condition that affects the way the body processes blood sugar (glucose).'),
        (3, 'Asthma', 'J45', 'A condition in which a person''s airways become inflamed, narrow and swell, and produce extra mucus.'),
        (4, 'Chronic Obstructive Pulmonary Disease (COPD)', 'J44', 'A group of lung diseases that block airflow and make it difficult to breathe.'),
        (5, 'Depressive Disorder', 'F32', 'A mental health disorder characterized by persistently depressed mood or loss of interest in activities.'),
        (6, 'Anxiety Disorder', 'F41', 'A group of mental disorders characterized by significant feelings of anxiety and fear.'),
        (7, 'Migraine', 'G43', 'A neurological condition characterized by intense, debilitating headaches.'),
        (8, 'Osteoarthritis', 'M19', 'A type of arthritis that occurs when flexible tissue at the ends of bones wears down.'),
        (9, 'Hypothyroidism', 'E03', 'A condition in which the thyroid gland doesn''t produce enough thyroid hormones.'),
        (10, 'Gastroesophageal Reflux Disease (GERD)', 'K21', 'A digestive disease in which stomach acid or bile irritates the food pipe lining.'),
        (11, 'Acute Bronchitis', 'J20', 'An inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.'),
        (12, 'Urinary Tract Infection', 'N39', 'An infection in any part of your urinary system — kidneys, ureters, bladder, and urethra.'),
        (13, 'Anemia', 'D64', 'A condition in which the blood doesn''t have enough healthy red blood cells.'),
        (14, 'Back Pain', 'M54', 'Pain felt in the back that usually originates from the muscles, nerves, bones, joints or other structures.'),
        (15, 'Sinusitis', 'J01', 'An inflammation or swelling of the tissue lining the sinuses.'),
        (16, 'Pneumonia', 'J18', 'An infection that inflames the air sacs in one or both lungs.'),
        (17, 'Epilepsy', 'G40', 'A central nervous system disorder in which brain activity becomes abnormal, causing seizures.'),
        (18, 'Coronary Artery Disease', 'I25', 'Damage or disease in the heart’s major blood vessels.'),
        (19, 'Chronic Kidney Disease', 'N18', 'A long-term condition where the kidneys do not work effectively.'),
        (20, 'Liver Cirrhosis', 'K74', 'Late-stage liver disease marked by fibrosis of liver tissue.'),
        (21, 'Tuberculosis', 'A15', 'A potentially serious infectious disease that mainly affects the lungs.'),
        (22, 'Malaria', 'B50', 'A disease caused by a plasmodium parasite, transmitted by the bite of infected mosquitoes.'),
        (23, 'Hepatitis B', 'B18', 'A serious liver infection caused by the hepatitis B virus.'),
        (24, 'HIV Disease', 'B24', 'A virus that attacks the body’s immune system.'),
        (25, 'COVID-19', 'U07.1', 'A respiratory illness caused by the novel coronavirus SARS-CoV-2.'),
        (26, 'Chickenpox', 'B01', 'A highly contagious viral infection causing an itchy, blister-like rash.'),
        (27, 'Measles', 'B05', 'A viral infection that''s serious for small children but is easily preventable by a vaccine.'),
        (28, 'Mumps', 'B26', 'A viral infection that affects the salivary glands.'),
        (29, 'Rubella', 'B06', 'A contagious viral infection best known by its distinctive red rash.'),
        (30, 'Tetanus', 'A35', 'A bacterial infection that causes painful muscle stiffness and spasms.'),
        (31, 'Appendicitis', 'K35', 'An inflammation of the appendix.'),
        (32, 'Gallstones', 'K80', 'Hard deposits of digestive fluid that can form in the gallbladder.'),
        (33, 'Pancreatitis', 'K85', 'An inflammation of the pancreas.'),
        (34, 'Peptic Ulcer Disease', 'K27', 'Sores that develop on the lining of the stomach, lower esophagus, or small intestine.'),
        (35, 'Celiac Disease', 'K90.0', 'An immune reaction to eating gluten.'),
        (36, 'Rheumatoid Arthritis', 'M06', 'An autoimmune disorder that primarily affects joints.'),
        (37, 'Lupus', 'M32', 'A systemic autoimmune disease that occurs when your body’s immune system attacks your own tissues and organs.'),
        (38, 'Psoriasis', 'L40', 'A skin disease that causes red, itchy scaly patches.'),
        (39, 'Eczema', 'L30', 'A condition that makes your skin red and itchy.'),
        (40, 'Acne Vulgaris', 'L70', 'A skin condition that occurs when hair follicles become clogged with oil and dead skin cells.'),
        (41, 'Conjunctivitis', 'H10', 'An inflammation or infection of the outer membrane of the eyeball and the inner eyelid.'),
        (42, 'Glaucoma', 'H40', 'A group of eye conditions that damage the optic nerve.'),
        (43, 'Cataract', 'H25', 'A clouding of the normally clear lens of your eye.'),
        (44, 'Otitis Media', 'H66', 'An infection of the middle ear.'),
        (45, 'Allergic Rhinitis', 'J30', 'An allergic reaction that causes sneezing, congestion, and a runny nose.'),
        (46, 'Obesity', 'E66', 'A complex disease involving an excessive amount of body fat.'),
        (47, 'Gout', 'M10', 'A form of arthritis characterized by severe pain, redness, and tenderness in joints.'),
        (48, 'Insomnia', 'F51', 'A sleep disorder in which you have trouble falling and/or staying asleep.'),
        (49, 'Alcohol Use Disorder', 'F10', 'A medical condition characterized by an impaired ability to stop or control alcohol use.'),
        (50, 'Nicotine Dependence', 'F17', 'Addiction to tobacco products containing nicotine.')
    ]
    
    for id_, name, code, desc in diagnoses:
        Diagnosis.objects.get_or_create(
            id=id_,
            defaults={"name": name, "code": code, "description": desc},
        )

class Migration(migrations.Migration):

    dependencies = [
        ("clinical", "0002_initial"),
    ]

    operations = [
        migrations.RunPython(add_diagnoses),
    ]